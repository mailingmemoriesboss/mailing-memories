// Copy to a private standalone Google Apps Script. Enable advanced Calendar service.
const MM_URL = 'https://mailingmemories.com/api/calendar-orders';
const MM_ADMIN = 'https://mailingmemories.com/admin/orders';
const MM_ZONE = 'America/Chicago';
function generateCalendarToken() {
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty('MM_TOKEN')) p.setProperty('MM_TOKEN', Utilities.getUuid().replace(/-/g,'')+Utilities.getUuid().replace(/-/g,''));
  // Retrieve from Project Settings > Script properties. Never log this token.
}
function installCalendarSync() {
  syncOrders();
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'syncOrders')) {
    ScriptApp.newTrigger('syncOrders').timeBased().everyHours(1).create();
  }
}
function plusDays(date, days) {
  const d = new Date(date+'T12:00:00Z');
  d.setUTCDate(d.getUTCDate()+days);
  return d.toISOString().slice(0,10);
}
function standardMailDate(date) {
  let d=date, n=0;
  while(n<2) {
    d=plusDays(d,1);
    const day=new Date(d+'T12:00:00Z').getUTCDay();
    if(day!==0 && day!==6) n++;
  }
  return d;
}
function orderEvents(order) {
  if (!/^[0-9a-f-]{36}$/i.test(order.id)) throw Error('Invalid order identifier');
  const paid = Utilities.formatDate(new Date(order.paid_at),MM_ZONE,'yyyy-MM-dd');
  const mail = order.requested_ship_date || standardMailDate(paid);
  const final = ['mailed','completed','cancelled'].includes(order.status);
  const label = final ? ' — '+order.status.toUpperCase() : '';
  return [['prepare',paid,'Prepare card'],['mail',mail,'Mail card']].map(([kind,date,title]) => ({
    id: 'mm'+order.id.replace(/-/g,'').toLowerCase()+(kind==='prepare'?'a':'b'),
    summary: 'MM — '+title+' #'+order.id.slice(0,8)+label,
    description: 'Order: '+order.id+'\nStatus: '+order.status+'\nMailing date: '+mail+'\n'+MM_ADMIN,
    start:{date},end:{date:plusDays(date,1)},visibility:'private',transparency:'transparent',
    reminders:{useDefault:false,overrides:final?[]:[{method:'popup',minutes:kind==='prepare'?0:1440}]},
    extendedProperties:{private:{mmSource:'mailing-memories-v1',mmOrder:order.id,mmKind:kind}}
  }));
}
function sameEvent(a,b) {
  return a.summary===b.summary && a.description===b.description &&
    a.start.date===b.start.date && a.end.date===b.end.date &&
    a.visibility===b.visibility && a.transparency===b.transparency &&
    a.reminders?.useDefault===false &&
    JSON.stringify((a.reminders?.overrides||[]).map(r=>[r.method,r.minutes]))===
    JSON.stringify(b.reminders.overrides.map(r=>[r.method,r.minutes]));
}
function syncOrders() {
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(1000)) return;
  try {
    const p=PropertiesService.getScriptProperties();
    const token=p.getProperty('MM_TOKEN'), calendar=p.getProperty('MM_CALENDAR_ID'), since=p.getProperty('MM_START_DATE');
    if(!token || !calendar || !since || calendar==='primary') throw Error('Configure dedicated calendar and token first');
    const response=UrlFetchApp.fetch(MM_URL+'?since='+encodeURIComponent(since),{
      headers:{Authorization:'Bearer '+token},followRedirects:false,muteHttpExceptions:true
    });
    if(response.getResponseCode()!==200) throw Error('Order sync failed: HTTP '+response.getResponseCode());
    const data=JSON.parse(response.getContentText());
    if(data.version!==1 || !Array.isArray(data.orders)) throw Error('Invalid order snapshot');
    const existing={}; let pageToken;
    do {
      const page=Calendar.Events.list(calendar,{privateExtendedProperty:'mmSource=mailing-memories-v1',maxResults:2500,pageToken});
      (page.items||[]).forEach(e=>existing[e.id]=e);
      pageToken=page.nextPageToken;
    } while(pageToken);
    const desired=data.orders.flatMap(orderEvents);
    for(const event of desired) {
      const current=existing[event.id];
      if(!current) Calendar.Events.insert(event,calendar,{sendUpdates:'none'});
      else if(!sameEvent(current,event)) {
        const {id,...patch}=event;
        Calendar.Events.patch(patch,calendar,id,{sendUpdates:'none'});
      }
    }
    // Never delete calendar entries merely because a record is missing from a snapshot.
    p.setProperty('MM_LAST_SUCCESS',new Date().toISOString());
    console.log('Calendar sync complete; '+data.orders.length+' orders reviewed.');
  } finally { lock.releaseLock(); }
}

const colorStatus = (status) => {
  if(status === 'PENDING') 
    return {
      color: '#FCDC2A',
      body: 'Đang chờ xác nhận'
    };
  if(status === 'DELIVERY') 
    return {
      color: '#FCDC2A',
      body: 'Đang di chuyển'
    };
  if(status === 'WORKING') 
    return {
      color: '#DD761C',
      body: 'Đang làm việc'
    };
  if(status === 'COMPLETED') 
    return {
      color: '#68D2E8',
      body: 'Đã hoàn thành'
    };
  if(status.includes('CANCELLED')) {
    let body = 'Đã hủy';
    if(status === 'CANCELLED_BY_CUSTOMER') body = 'Đã hủy bởi khách hàng';
    if(status === 'CANCELLED_BY_KLEENIX') body = 'Đã hủy bởi Kleenix';
    return {
      color: '#FF5580',
      body
    };
  }
  if(status === 'CONFIRMED') 
    return {
      color: '#41B06E',
      body: 'Đã xác nhận'
    };
  return {
    color: 'text-white',
    body: ''
  };
}

export default colorStatus;
const Notification = ({ error, message }) => {
  if (!message) return null;
  const classes = 'notif' + (error ? ' error' : '');
  return (
    <div className={classes}>
      {message}
    </div>
  );
}

export default Notification;

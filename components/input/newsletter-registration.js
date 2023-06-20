import React, {useRef, useContext} from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '@/store/notification-context';
NotificationContext;
function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    const userEnteredEmail = emailRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'Pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: userEnteredEmail}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        // Nested promise to throw and error for http code: 400 / 500
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong ');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

'use client'

import { useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        console.log('here')

        // optional: add client-side validation
        const id = toast.loading('Processing your request...');
        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });
            toast.update(id, {
                render: 'Message sent successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
            setRequestStatus('success');
            setEnteredMessage('');
            setEnteredEmail('');
            setEnteredName('');
        } catch (error) {
            toast.update(id, {
                render: requestError,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    // let notification;

    // if (requestStatus === 'pending') {
    //     toast.loading('Processing your request...')

    //     // notification = {
    //     //     status: 'pending',
    //     //     title: 'Sending message...',
    //     //     message: 'Your message is on its way!',
    //     // };
    // }

    // if (requestStatus === 'success') {
    //     toast.update(id, {
    //         render: 'Message sent successfully!',
    //         type: 'success',
    //         isLoading: false,
    //         autoClose: 3000,
    //     });

    //     // NotificationManager.success('Success message', 'Message sent successfully!');
    //     // notification = {
    //     //     status: 'success',
    //     //     title: 'Success!',
    //     //     message: 'Message sent successfully!',
    //     // };
    // }

    // if (requestStatus === 'error') {
    //     // NotificationManager.error('Error message', requestError, 5000, () => {
    //     //     alert(requestError);
    //     // });

    //     toast.update(id, {
    //         render: requestError,
    //         type: 'error',
    //         isLoading: false,
    //         autoClose: 3000,
    //     });


    //     // notification = {
    //     //     status: 'error',
    //     //     title: 'Error!',
    //     //     message: requestError,
    //     // };
    // }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={enteredEmail}
                            onChange={(event) => setEnteredEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={enteredName}
                            onChange={(event) => setEnteredName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows='5'
                        required
                        value={enteredMessage}
                        onChange={(event) => setEnteredMessage(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {/* {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )} */}
            <ToastContainer />
        </section>
    );
}

export default ContactForm;

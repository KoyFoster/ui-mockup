import { useEffect, useState } from 'react';
import './index.scss';

interface Message {
  id: string;
  message: string;
  x: string;
  y: string;
  show: boolean;
}

/** How long the popup for action remains on the screen in milliseconds. */
const defaultDuration = 3000;
/** How long the popup for action remains on the screen in milliseconds. */
const defaultFadeIn = 100;
/** How long before the popup starts to fade out screen in milliseconds. */
const defaultFadeOut = 1000;

const Messages = ({
  id,
  show,
  message,
  x,
  y,
}: {
  id: string;
  show: boolean;
  message: string;
  x: string;
  y: string;
}) => {
  return (
    <div
      key={id}
      id={id}
      className={'action-display-popup' + (show ? ' fade-in' : ' fade-out')}
      style={{ left: x, top: y }}
    >
      {message}
    </div>
  );
};

// I'm personally questions my way of handling all this.
const TransientPopup = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [timers, setTimers] = useState([] as NodeJS.Timeout[]);

  const renderMessages = () =>
    messages.map((msg) => {
      return <Messages key={msg.id} {...msg} />;
    });
  const addTransientMessage = (
    id: string,
    decay = defaultDuration,
    fadeIn = defaultFadeIn,
    fadeOut = defaultFadeOut
  ) => {
    // Ignore duplicates
    // TODO (2023-03-06): Maybe allow updating of existing later on
    if (messages.findIndex(({ id: msgId }) => msgId === id) >= 0) return false;

    // TODO (2023-03-05): Throw all this into a reducer
    // decay
    let decayTime: NodeJS.Timeout;
    if (decay) {
      decayTime = setTimeout(() => {
        setMessages((msgs) => msgs.filter(({ id: msgId }) => msgId !== id));
      }, decay);
    }
    // show
    let showTime: NodeJS.Timeout;
    if (decay && fadeIn)
      showTime = setTimeout(() => {
        setMessages((msgs) => {
          const msg = msgs.find(({ id: msgId }) => msgId === id);
          if (msg) msg.show = true;
          return [...msgs];
        });
      }, fadeIn);
    // hide
    let hideTime: NodeJS.Timeout;
    if (decay && fadeOut)
      hideTime = setTimeout(() => {
        setMessages((msgs) => {
          const msg = msgs.find(({ id: msgId }) => msgId === id);
          if (msg) msg.show = false;
          return [...msgs];
        });
      }, decay - fadeOut);
    // Pocket timers for future cleanup
    setTimers((times) => {
      const bundle = [];
      if (decayTime) {
        bundle.push(decayTime);
      }
      if (showTime) {
        bundle.push(showTime);
      }
      if (hideTime) {
        bundle.push(hideTime);
      }

      return [...times, ...bundle];
    });

    setMessages((msgs) => [
      ...msgs,
      {
        id: id,
        message: `You tried to ${id}, but nothing happened.`,
        x: `${Math.floor(Math.random() * 51)}%`,
        y: `${10 + Math.floor(Math.random() * 41)}%`,
        show: false,
      },
    ]);

    return true;
  };

  useEffect(() => {
    return () => {
      timers.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { renderMessages, addTransientMessage };
};

export default TransientPopup;

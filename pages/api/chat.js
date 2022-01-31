var messages = [
  /*{ user: 'teste', message: 'init', date: new Date() }*/
];

export default function handler(req, res) {
  if (req.method == 'GET') {
    return res.status(200).json({ messages: messages });
  }

  if (req.method == 'POST') {
    const user = req.body.user;
    const message = req.body.message;
    const date = req.body.date;
    if (user == null || message == null || date == null) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    messages = [{ user: user, message: message, date: date }, ...messages];

    res?.socket?.server?.io?.emit('message', user, message, date);

    return res.status(200).json({ message: 'Message sent' });
  }
}

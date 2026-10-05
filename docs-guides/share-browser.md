# Let your agent use a browser

**What you'll do:** give your Code or Crew agent a browser — its own managed window, or tabs from your own Chrome or Edge — and know exactly what it can see.

Your agent starts with no browser. You add one of two kinds. Either way it sees pages as text and screenshots, clicks and types like you would, and shows its work in the chat.

*Browser sharing is available in Code and Crew projects. Workflows don't offer it yet.*

## The two kinds

| | Managed browser | Your Chrome or Edge (extension) |
|---|---|---|
| Where it runs | A Chromium window on the server, owned by the project | Your own computer, in your own profile |
| Your logins | It signs in where you teach it to | It uses tabs you've already signed in to — your cookies never leave your machine |
| Best for | Routine browsing the agent does alone | Sites where you're already logged in |

## Steps: share tabs from your own browser

1. **Open the Browser settings.** In an owned Code or Crew project, open Browser → Settings and choose **My Chrome or Edge · extension**.
2. **Install the extension.** Download the ZIP from that panel and unzip it. In Chrome open `chrome://extensions` (in Edge, `edge://extensions`), enable **Developer mode**, choose **Load unpacked**, and select the unzipped folder. No store login needed.
3. **Pair it.** Copy the connection in AgentWorks, paste it into the extension popup, and choose **Connect browser**. One code covers all your owned projects — pairing a second project connects it automatically, nothing to paste again.
4. **Let it work.** The agent creates its own project tabs by itself. To point it at a page you already have open, choose the project and **Share this tab** in the extension.
5. **Disconnect any time.** Disconnect in the extension stops that project. Reset rotates your code and closes every live connection at once.

## FAQs

**What exactly can it see?**
Only tabs shared with that project — nothing else in your browser. Page text and screenshots travel to AgentWorks to do the task; your login cookies stay on your machine. One tab can be shared with one project at a time.

**Does grouping tabs share them?**
No. Groups only organize tabs you've already shared; dragging an unshared tab into a group does not grant access.

**It stopped working — what happened?**
Connections last at most eight hours, and a server or browser restart drops them. Reconnect in the extension — nothing is restored silently, so you always know what's shared.

**Can readers of my Crew use my browser?**
No. Only the project owner pairs a browser. Readers chat with the agent; they never inherit your Chrome.

*Need help? [Book a call](https://calendar.google.com/calendar/appointments/schedules/AcZssZ1IrGuhEQLUL5dEFGm4OWRJvz5M0KOaizd2SH2-oadqBESndvBRGq8s1MF41uOI931Xu1NrhfZu) and we'll set up browser sharing with you.*

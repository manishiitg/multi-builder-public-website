# Connect Gmail and control what it sends

**What you'll do:** connect a mailbox, choose whether the agent may only read it or also send from it, and keep every send behind your approval.

Nothing is connected until you connect it. You sign in with Google yourself — the Builder never sees your login — and sending stays off until you explicitly allow it.

## Steps

1. **Connect the account.** Ask the Builder to connect Gmail. Code owners connect their own private accounts; shared Crew and workflow accounts are connected by an administrator.
2. **Pick the grant: read, or read and send.** Reading (searching and summarizing mail) needs a read grant. Drafting, sending, and replying need the send grant on top — an explicit opt-in that starts off.
3. **Ask for drafts first.** Have the agent draft before it ever sends: "draft a reply to Acme about the invoice." You see the exact text in the chat.
4. **Approve each send.** Outward-facing sends ask first at the default level. Approve in the chat (or in Slack/WhatsApp, if you've connected those) and it goes out; anything else you write is treated as feedback. See [Approvals and autonomy](approvals-autonomy.md).

## FAQs

**Which mailbox does it use?**
The connected account you chose — a Code uses its owner's private account; a Crew or workflow uses the shared account its administrator connected.

**Can it send without asking?**
Not at the default level. Every send is an outward-facing action, so it waits for your approval until you raise that goal's autonomy.

**How do I stop it sending?**
Take away the send grant (ask the Builder), or revoke access in your Google account. Reading and sending are separate grants — removing send leaves reading intact.

**What about mail coming in?**
That's the other half: give the project its own address so emailing it starts a chat. See [Give your project an email address](incoming-gmail.md).

*Need help? [Book a call](https://calendar.google.com/calendar/appointments/schedules/AcZssZ1IrGuhEQLUL5dEFGm4OWRJvz5M0KOaizd2SH2-oadqBESndvBRGq8s1MF41uOI931Xu1NrhfZu) and we'll set safe sending limits with you.*

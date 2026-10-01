# Give your project an email address

**What you'll do:** give a Crew, workflow, or Code its own email address, so emailing it starts (or continues) a chat there.

Each project gets a stable address such as `you+agent-<id>@yourdomain.com`. It lands in your existing mailbox — no new account or mail server. Every email conversation becomes its own chat under that project; replying in the same email thread continues the same chat.

## Steps

1. **Ask the Builder to set it up.** In the project's chat, ask for an incoming email address. The Email panes only show status — the Builder does the configuration.
2. **Connect your mailbox if asked.** Incoming mail needs Gmail read access on a connected account. You complete Google's consent yourself; the Builder never sees your login.
3. **Email the address once it reads Ready.** Send from your own email address — only the project owner's mail is accepted. Verify one chat appears under the project.
4. **Reply to continue.** Answer in the same email thread and the same chat continues. A separate email conversation starts a separate chat.

To pause, ask the Builder to disable the address. Mail sent while disabled never triggers work later, and re-enabling starts fresh.

## What gets processed

| Accepted | Ignored |
|---|---|
| Mail from your own address | Mail from anyone else |
| Authenticated mail (sender domain verified) | Auto-replies, mailing lists, spam, trash |
| New mail arriving after setup | Anything older than the current window |

An address never shares your private chats, files, logins, tools, or budget. If replies are on, the response goes back to you — only ever to you, never to CC.

## FAQs

**What can I attach?**
Files up to 20 MiB total per email (20 files max). They land in the project's uploads folder and are named in the chat. Email bodies over 256 KiB are skipped.

**Something didn't trigger — where do I look?**
Open Recent email activity on the project. Every delivery shows its state and reason: received, running, completed, rejected, failed, or uncertain.

**What does "uncertain" mean?**
The run was interrupted — for example a restart mid-send. Look at the saved chat and your Sent folder before resending: replaying a half-run email can repeat real side effects. Failed sends are never retried automatically.

**Can I filter which emails get processed?**
Not yet — per-address filters (subject or body keywords, attachments, new threads only) are planned. They will only ever narrow what gets processed, and filtered-out mail will stay visible in Recent activity with its reason.

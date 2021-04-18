# hermbot
## simple custom discord bot, discord.js library.

### commands:
`say [message]` - parrots the message in the current channel and deletes the triggering command.  
`pennant [message]` - formats a message in 'pennant' style where it resembles a pennant flag.  
`cri [word]` - 'squares' a word.  
`heron [integer]` - return the approximate square root of a given positive integer to within four, implementing Heron of Alexandria's formula.  
`post [argument]` - posts a link (loaded from argument key in config.json) to the channel.  

### housekeeping:
- automatically deletes discord invites (catches both `discord.gg` and `discord.com` invites).
- automatically deletes any message with the phrase FunkyDance.

### to do:
- function to automatically convert between imperial and metric values.
- function to set listening on channels?

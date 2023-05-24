import { Events } from 'discord.js'

import { defineEventHandler } from '@/types/defineEventHandler'
import isOnlyEmoji from '@/utils/isOnlyEmoji'

export default defineEventHandler({
  eventName: Events.MessageCreate,
  once: false,
  execute: async ({ runtimeConfiguration }, message) => {
    // if has only emoji -> delete message
    if (isOnlyEmoji(message.content)) {
      try {
        console.info(
          `[preventEmojiSpam] Message with only emoji: ${message.id} by ${message.author}`,
        )
        if (runtimeConfiguration.data.preventEmojiSpam.enabled) {
          await message.delete()
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
})

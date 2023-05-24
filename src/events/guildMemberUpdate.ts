import { Events } from 'discord.js'

import { defineEventHandler } from '@/types/defineEventHandler'

export default defineEventHandler({
  eventName: Events.GuildMemberUpdate,
  once: false,
  execute: async (botContext, previous, next) => {
    if (previous.nickname !== next.nickname) {
      if (!previous.nickname) {
        console.info(
          `[guildMemberUpdate] "${next.user.tag}" [${next.id}] set their nickname to "${next.nickname}" in "${next.guild.name}" [${next.guild.id}]`,
        )
      } else if (next.nickname) {
        console.info(
          `[guildMemberUpdate] "${next.user.tag}" [${next.id}] changed nickname from "${previous.nickname}" to "${next.nickname}" in "${next.guild.name}" [${next.guild.id}]`,
        )
      } else {
        console.info(
          `[guildMemberUpdate] "${next.user.tag}" [${next.id}] removed their nickname "${previous.nickname}" in "${next.guild.name}" [${next.guild.id}]`,
        )
      }
    }
    const previousRoles = new Set(previous.roles.cache.map((role) => role.id))
    const nextRoles = new Set(next.roles.cache.map((role) => role.id))
    const addedRoles = [...nextRoles].filter((role) => !previousRoles.has(role))
    const removedRoles = [...previousRoles].filter(
      (role) => !nextRoles.has(role),
    )
    for (const roleId of addedRoles) {
      const role = next.guild.roles.cache.get(roleId)
      if (!role) continue
      console.info(
        `[guildMemberUpdate] "${next.user.tag}" [${next.id}] was given the role "${role.name}" [${role.id}] in "${next.guild.name}" [${next.guild.id}]`,
      )
    }
    for (const roleId of removedRoles) {
      const role = previous.guild.roles.cache.get(roleId)
      if (!role) continue
      console.info(
        `[guildMemberUpdate] "${next.user.tag}" [${next.id}] was removed from the role "${role.name}" [${role.id}] in "${next.guild.name}" [${next.guild.id}]`,
      )
    }
  },
})

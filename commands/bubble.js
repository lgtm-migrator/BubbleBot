const { SlashCommand, CommandOptionType } = require('slash-create');
const BubbleWrap = require("../src/BubbleWrap");

module.exports = class BubbleCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'bubble',
            description: 'Generate bubblewrap!',
            options: [{
                type: CommandOptionType.INTEGER,
                name: 'size',
                description: 'The size of the bubble wrap. Must be between 1 and 13. Defaults to 10.'
            },
            {
                type: CommandOptionType.INTEGER,
                name: 'prepopped',
                description: 'The percent of bubbles to prepop. Defaults to 0 (none).'
            }],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(ctx) {
        let size = ctx.options.size == undefined ? 10 : ctx.options.size;
        let popChance = ctx.options.prepopped == undefined ? 0 : ctx.options.prepopped;

        if (size < 1 || size > 13) return {
            content: `I was unable to process your request since the size you requested was not between 1 and 13.`,
            ephemeral: true
        };

        if (popChance < 1 || popChance > 100) return {
            content: `I was unable to process your request since the prepop chance you requested was not between 0 and 100.`,
            ephemeral: true
        }

        var bubblewrap = new BubbleWrap(size, popChance);
        return {
            content: bubblewrap.generate(),
            includeSource: true
        };
    }
}
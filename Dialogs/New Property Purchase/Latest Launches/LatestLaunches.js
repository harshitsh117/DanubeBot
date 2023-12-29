const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_LatestLaunches(context) {
    const cardActions = [
        {
            type: ActionTypes.PostBack,
            title: 'Oceanz',
            value: 'Oceanz'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Sportz',
            value: 'Sportz'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Eleganz',
            value: 'Eleganz'
        }
    ];

    const heroCard = CardFactory.heroCard(
        'Choose an Option:',
        undefined,
        cardActions
    );


    const reply = MessageFactory.attachment(heroCard);
    await context.sendActivity(reply);
}

module.exports = {
    sendSuggestedActionsHeroCard_LatestLaunches
    // handleOptionSelection
};

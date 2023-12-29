const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_Eleganz(context) {
    const cardActions = [
        {
            type: ActionTypes.PostBack,
            title: 'View Property Info',
            value: 'ViewPropertyInfo_Eleganz'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Register Now',
            value: 'RegisterNow_Eleganz'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Home Menu',
            value: 'HomeMenu'
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
    sendSuggestedActionsHeroCard_Eleganz
    // handleOptionSelection
};

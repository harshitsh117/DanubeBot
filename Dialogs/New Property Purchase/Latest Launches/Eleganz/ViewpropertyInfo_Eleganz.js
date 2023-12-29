const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard__ViewPropertyInfo_Eleganz(context) {
    const cardActions = [
        
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
        'View property info for Eleganz:',
        undefined,
        cardActions
    );


    const reply = MessageFactory.attachment(heroCard);
    await context.sendActivity(reply);
}

module.exports = {
    sendSuggestedActionsHeroCard__ViewPropertyInfo_Eleganz
    // handleOptionSelection
};

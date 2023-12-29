const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_ViewPropertyInfo_Sportz(context) {
    const cardActions = [
        
        {
            type: ActionTypes.PostBack,
            title: 'Register Now',
            value: 'RegisterNow_Sportz'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Home Menu',
            value: 'HomeMenu'
        }
    ];

    const heroCard = CardFactory.heroCard(
        'View property info for Sportz:',
        undefined,
        cardActions
    );


    const reply = MessageFactory.attachment(heroCard);
    await context.sendActivity(reply);
}

module.exports = {
    sendSuggestedActionsHeroCard_ViewPropertyInfo_Sportz
    // handleOptionSelection
};

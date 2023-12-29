const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_NewPropertyPurchase(context) {
    const cardActions = [
        {
            type: ActionTypes.PostBack,
            title: 'Latest Launches',
            value: 'LatestLaunches'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Latest Offers',
            value: 'LatestOffers'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Chat with Sales',
            value: 'ChatwithSales'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Career',
            value: 'Career'
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
    sendSuggestedActionsHeroCard_NewPropertyPurchase
    // handleOptionSelection
};

const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_LatestOffers(context) {
    const cardActions = [
        {
            type: ActionTypes.PostBack,
            title: '1% Payment Plan',
            value: '1_percent_payment_plan'
        },
        {
            type: ActionTypes.PostBack,
            title: 'fully furnished apartment',
            value: 'fully_furnished_apartment'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Gauranteed Returns',
            value: 'GauranteedReturns'
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
    sendSuggestedActionsHeroCard_LatestOffers
    // handleOptionSelection
};

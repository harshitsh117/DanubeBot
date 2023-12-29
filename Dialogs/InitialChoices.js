//const { LatestLaunches } = require('./NewPropertyPurchaseDialog');

const { ActionTypes, CardFactory, MessageFactory } = require('botbuilder');


async function sendSuggestedActionsHeroCard_InitialChoice(context) {
    const cardActions = [
        {
            type: ActionTypes.PostBack,
            title: 'New Property Purchase',
            value: 'NewPropertyPurchase'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Existing Property',
            value: 'ExistingProperty'
        },
        {
            type: ActionTypes.PostBack,
            title: 'Inquire About Handover Property',
            value: 'InquireAboutHandoverProperty'
        },
        {
            type: ActionTypes.PostBack,
            title: 'General Query',
            value: 'GeneralQuery'
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

/*
async function handleOptionSelection(context, option) {
    switch (option) {
        case 'New Property Purchase':
          //  console.log('Option 1 selected')
           const newPropertyPurchaseDialog = new NewPropertyPurchaseDialog();
            await newPropertyPurchaseDialog.run(context, context.dialogs);
            break;


        default:
            await context.sendActivity(`Option '${option}' not recognized.`);
            break;
    }
}
*/

module.exports = {
    sendSuggestedActionsHeroCard_InitialChoice
   // handleOptionSelection
};

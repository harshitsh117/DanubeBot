const { sendSuggestedActionsHeroCard_InitialChoice } = require('./Dialogs/InitialChoices');
const { sendSuggestedActionsHeroCard_NewPropertyPurchase } = require('./Dialogs/New Property Purchase/NewPropertyPurchaseDialog');
const { sendSuggestedActionsHeroCard_LatestLaunches } = require('./Dialogs/New Property Purchase/Latest Launches/LatestLaunches.js');
const { sendSuggestedActionsHeroCard_LatestOffers } = require('./Dialogs/New Property Purchase/Latest Offers/LatestOffers.js');
const { sendSuggestedActionsHeroCard_Oceanz } = require('./Dialogs/New Property Purchase/Latest Launches/Oceanz/Oceanz.js');
const { sendSuggestedActionsHeroCard_Sportz } = require('./Dialogs/New Property Purchase/Latest Launches/Sportz/Sportz.js');
const { sendSuggestedActionsHeroCard_Eleganz } = require('./Dialogs/New Property Purchase/Latest Launches/Eleganz/Eleganz.js');
const { sendSuggestedActionsHeroCard_ViewPropertyInfo_Oceanz } = require('./Dialogs/New Property Purchase/Latest Launches/Oceanz/ViewpropertyInfo_Oceanz.js');
const { sendSuggestedActionsHeroCard_ViewPropertyInfo_Sportz } = require('./Dialogs/New Property Purchase/Latest Launches/Sportz/ViewpropertyInfo_Sportz.js');
const { sendSuggestedActionsHeroCard_ViewPropertyInfo_Eleganz } = require('./Dialogs/New Property Purchase/Latest Launches/Eleganz/ViewpropertyInfo_Eleganz.js');
const { ActivityHandler } = require('botbuilder');
const { MemoryStorage, ConversationState, UserState } = require('botbuilder');
const { DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');


var RegisterNow_Oceanz_called = false;
var RegisterNow_Sportz_called = false;
var RegisterNow_Eleganz_called = false;
var chatWithSales_called = false
var finalresult='';
var ProjectName = 'None';


const { spawn } = require('child_process');

const runPythonScript = async (userMessage) => {
  return new Promise((resolve, reject) => {
    // console.log(`UserMessage is ${userMessage}`)
    const pythonProcess = spawn('python', ['test.py', userMessage]);

    let resultData = '';

    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from test.py: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        // console.log("Result Data is : " + resultData);
        
        finalresult = resultData.trim() || userMessage;
        resolve(finalresult);
      } else {
        console.error(`test.py process exited with code ${code}`);
        reject(`test.py process exited with code ${code}`);
      }
    });
  });
};

class EmptyBot extends ActivityHandler {
    

    constructor(conversationState, userState, dialog) {
        super();

        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');
       

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome to Danube Bot');
                    await sendSuggestedActionsHeroCard_InitialChoice(context);
                    
                }
            }

            await next();
        });

        this.onMessage(async (context, next) => {
            //console.log(context);
            const userMessage = context.activity.text;
            // console.log(userMessage)
            console.log(`Project is ${ProjectName}`)
                    

            try {
                finalresult = await runPythonScript(userMessage);
                // console.log(typeof finalresult)
                // console.log(finalresult.length)
                // console.log(`Final Result is ${finalresult}`);
                if(finalresult==''){
                    console.log(`inside none`);
                    finalresult = userMessage
                }
                // console.log(`${userMessage}`)
              } catch (error) {
                console.error("Error running Python script:", error);
              }

              console.log(`finallll ${finalresult}`);
              console.log();

            if(finalresult==='RegisterNow_Oceanz')
            {
                // console.log("register oceanz")
                RegisterNow_Oceanz_called = true;
                await this.dialog.run(context, this.dialogState,ProjectName);
            }
            else if(RegisterNow_Oceanz_called)
            {
                await this.dialog.run(context, this.dialogState,ProjectName);
                await next();
            }
            else if(finalresult==='RegisterNow_Eleganz')
            {
                RegisterNow_Eleganz_called = true;
                await this.dialog.run(context, this.dialogState,ProjectName);
            }
            else if(RegisterNow_Eleganz_called)
            {
                await this.dialog.run(context, this.dialogState,ProjectName);
                await next();
            }
            else if(finalresult==='RegisterNow_Sportz')
            {
                RegisterNow_Sportz_called = true;
                await this.dialog.run(context, this.dialogState,ProjectName);
            }
            else if(RegisterNow_Sportz_called)
            {
                await this.dialog.run(context, this.dialogState,ProjectName);
                await next();
            }
            else if(finalresult==='ChatwithSales')
            {
                chatWithSales_called = true;
                await this.dialog.run(context, this.dialogState,ProjectName);
            }
            else if(chatWithSales_called)
            {
                await this.dialog.run(context, this.dialogState,ProjectName);
                await next();
            }
            else{

                switch (finalresult) {
                case 'start':
                    await sendSuggestedActionsHeroCard_InitialChoice(context);
                    break;

                case 'NewPropertyPurchase':
                    await sendSuggestedActionsHeroCard_NewPropertyPurchase(context);
                    // Begin the dialog with the initialStep
                    // await newPropertyPurchaseDialog.beginDialog(context, {});
                    break;

                case 'ExistingProperty':
                    await context.sendActivity('Existing Property Called');

                    // Handle Existing Property option
                    break;

                case 'InquireAboutHandoverProperty':
                    await context.sendActivity('Inquire About Property Called');
                    // Handle Inquire About Handover Property option
                    break;

                case 'GeneralQuery':
                    await context.sendActivity('General Query Called');
                    // Handle General Query option
                    break;

                case 'LatestLaunches':
                    await sendSuggestedActionsHeroCard_LatestLaunches(context);
                    // Handle LatestLaunches option
                    break;

                case 'LatestOffers':
                    await sendSuggestedActionsHeroCard_LatestOffers(context);
                    // Handle LatestOffers option
                    break;
``
                case 'ChatwithSales':
                    await this.dialog.run(context, this.dialogState);

                    // Handle ChatwithSales option
                    break;

                case 'Career':
                    // Handle Career option
                    break;

                case 'HomeMenu':
                    await sendSuggestedActionsHeroCard_InitialChoice(context);
                    // Handle HomeMenu option
                    break;

                case 'Oceanz':
                    ProjectName = 'Oceanz'
                    await sendSuggestedActionsHeroCard_Oceanz(context);
                    // Handle Oceanz option
                    break;

                case 'Sportz':
                    ProjectName = 'Sportz'
                    await sendSuggestedActionsHeroCard_Sportz(context);
                    // Handle Sportz option
                    break;

                case 'Eleganz':
                    ProjectName = 'Eleganz'

                    await sendSuggestedActionsHeroCard_Eleganz(context);
                    // Handle Eleganz option
                    break;

                case 'ViewPropertyInfo_Oceanz':
                    await sendSuggestedActionsHeroCard_ViewPropertyInfo_Oceanz(context);

                    // Handle ViewPropertyInfo_Oceanz option
                    break;

                case 'RegisterNow_Oceanz':
                        await this.dialog.run(context, this.dialogState,ProjectName);
                        
                    break;


                case 'ViewPropertyInfo_Sportz':
                    await sendSuggestedActionsHeroCard_ViewPropertyInfo_Sportz(context);
                    // Handle ViewPropertyInfo_Sportz option
                    break;

                case 'RegisterNow_Sportz':
                    await this.dialog.run(context, this.dialogState,ProjectName);

                    // Handle RegisterNow_Sportz option
                    break;

                case 'ViewPropertyInfo_Eleganz':
                    await sendSuggestedActionsHeroCard_ViewPropertyInfo_Eleganz(context);
                    // Handle ViewPropertyInfo_Eleganz option
                    break;

                case 'RegisterNow_Eleganz':
                    await this.dialog.run(context, this.dialogState,ProjectName);

                    // Handle RegisterNow_Eleganz option
                    break;

                default:
                    await context.sendActivity(`Option '${finalresult}' not recognized.`);
                    break;
                }
            }
            
        });
    }
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports = {
    EmptyBot,ProjectName
}
              
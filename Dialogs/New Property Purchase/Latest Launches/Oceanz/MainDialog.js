const { StatePropertyAccessor, TurnContext } = require('botbuilder');
const {
    ComponentDialog,
    DialogSet,
    DialogState,
    WaterfallDialog,
    WaterfallStepContext
} = require('botbuilder-dialogs');

const { RegisterNow_Oceanz } = require('D:/danube-bot/Dialogs/New Property Purchase/Latest Launches/Oceanz/RegisterNow_Oceanz.js');

const REGISTER_NOW = 'RegisterNow_Oceanz';
const MAIN_WATERFALL_DIALOG = 'MAIN_WATERFALL_DIALOG';

class MainDialog extends ComponentDialog {

    constructor(id) {
        super(id);
        this.addDialog(new RegisterNow_Oceanz(REGISTER_NOW))
            .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.initialStep.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    async run(context, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(context);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async initialStep(stepContext) {
        const registerNow_Oceanz = new RegisterNow_Oceanz();
        return await stepContext.beginDialog(REGISTER_NOW, registerNow_Oceanz);
    }

}

module.exports = MainDialog;

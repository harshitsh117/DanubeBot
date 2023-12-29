const sql = require('mssql');
const {ProjectName,EmptyBot} = require('D:/danube-bot/bot.js')

const config = {
    user: 'Harshit',
    password: '1234567890',
    server: 'DESKTOP-I5ERU41', // You can use 'localhost' if the SQL Server is running on the same machine
    database: 'Danube',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

const { MessageFactory } = require('botbuilder');
const {
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const { Channels } = require('botbuilder-core');
const { UserProfile } = require('D:/danube-bot/Dialogs/New Property Purchase/Latest Launches/Oceanz/userProfile.js');

const ATTACHMENT_PROMPT = 'ATTACHMENT_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const EMAIL_PROMPT = 'EMAIL_PROMPT';
const BUDGET_PROMPT = 'BUDGET_PROMPT';
const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

var name = "";
var email ="";
var budget;
var projectNameFinal="";

class RegisterNow extends ComponentDialog {
    constructor(userState) {
        super('userProfileDialog');

        this.userProfile = userState.createProperty(USER_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT,this.nameValidator));
        this.addDialog(new TextPrompt(EMAIL_PROMPT,this.emailValidator));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new NumberPrompt(BUDGET_PROMPT, this.budgetValidator));
        this.addDialog(new AttachmentPrompt(ATTACHMENT_PROMPT, this.picturePromptValidator));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
           // this.transportStep.bind(this),
            this.getName.bind(this),
            this.getEmail.bind(this),
            this.getBudget.bind(this),
            // this.nameConfirmStep.bind(this),
            // this.ageStep.bind(this),
            // this.pictureStep.bind(this),
            this.confirmStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor,ProjectName) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
        // console.log(`${turnContext}`)
        // console.log(`${accessor}`)
        console.log(ProjectName)
        projectNameFinal = ProjectName
    }

    // async transportStep(step) {
    //     // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    //     // Running a prompt here means the next WaterfallStep will be run when the user's response is received.
    //     return await step.prompt(CHOICE_PROMPT, {
    //         prompt: 'Please enter your mode of transport.',
    //         choices: ChoiceFactory.toChoices(['Car', 'Bus', 'Bicycle'])
    //     });
    // }

    async getName(step) {
        // var project = _ProjectName;
        //         console.log(`Project name is ${_ProjectName}`)
//         console.log(step.context);
//         projectName = step.context.activity.text;
//         const inputString = projectName;
//         const parts = inputString.split('_');

// // Extract the second part (index 1) after splitting by underscore
//         projectName = parts[1];

//         console.log(projectName);
        const promptOptions = { prompt: 'Please enter your name.', retryPrompt: 'You should only enter alphabets.' };

        return await step.prompt(NAME_PROMPT, promptOptions);
    }

    async getEmail(step) {
        // console.log(step);
        step.values.name = step.result;
        const promptOptions = { prompt: 'Please enter your email.', retryPrompt: 'You should enter email in the format, xyz123@xyz.com or xyz@xyz.com' };

        return await step.prompt(EMAIL_PROMPT, promptOptions);
    }
    async getBudget(step) {
        step.values.email = step.result;
        const promptOptions = { prompt: 'Please enter your budget.', retryPrompt: 'You should only enter numbers.' };

        return await  step.prompt(BUDGET_PROMPT,promptOptions);
    }
    
    // async nameConfirmStep(step) {
    //     step.values.name = step.result;

    //     // We can send messages to the user at any point in the WaterfallStep.
    //     await step.context.sendActivity(`Thanks ${step.result}.`);

    //     // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    //     return await step.prompt(CONFIRM_PROMPT, 'Do you want to give your age?', ['yes', 'no']);
    // }

    // async ageStep(step) {
    //     if (step.result) {
    //         // User said "yes" so we will be prompting for the age.
    //         // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    //         const promptOptions = { prompt: 'Please enter your age.', retryPrompt: 'The value entered must be greater than 0 and less than 150.' };

    //         return await step.prompt(NUMBER_PROMPT, promptOptions);
    //     } else {
    //         // User said "no" so we will skip the next step. Give -1 as the age.
    //         return await step.next(-1);
    //     }
    // }

    // async pictureStep(step) {
    //     step.values.age = step.result;

    //     const msg = step.values.age === -1 ? 'No age given.' : `I have your age as ${step.values.age}.`;

    //     // We can send messages to the user at any point in the WaterfallStep.
    //     await step.context.sendActivity(msg);

    //     if (step.context.activity.channelId === Channels.msteams) {
    //         // This attachment prompt example is not designed to work for Teams attachments, so skip it in this case
    //         await step.context.sendActivity('Skipping attachment prompt in Teams channel...');
    //         return await step.next(undefined);
    //     } else {
    //         // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
    //         var promptOptions = {
    //             prompt: 'Please attach a profile picture (or type any message to skip).',
    //             retryPrompt: 'The attachment must be a jpeg/png image file.'
    //         };

    //         return await step.prompt(ATTACHMENT_PROMPT, promptOptions);
    //     }
    // }

    async confirmStep(step) {
        name = step.values.name;
        email = step.values.email;
        budget = step.result;
        // step.values.picture = step.result && step.result[0];
        var msg = `Entered name : ${name}  \nEntered email : ${email}  \n Entered budget : ${budget}  \n Entered project : ${projectNameFinal} \n\n Is this okay?`

        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        return await step.prompt(CONFIRM_PROMPT, msg,['Yes','No']);
    }

    async summaryStep(step) {
        
        
        // console.log(projectName);
        // console.log(name);
        // console.log(email);
        // console.log(budget);
        // console.log(projectName);    
        // console.log(step.result);
        
        if(step.result)
        {
            try {
                // Connect to the database
                await sql.connect(config);
                console.log('Connected to the database');
                
                // Execute the query
                await sql.query(`insert into ClientDetails([Name], [Email], [Budget], [Project]) values('${step.values.name}', '${step.values.email}', ${budget}, '${projectNameFinal}')`);
                console.log("Inserted");
                const result = await sql.query('select id from ClientDetails order by id desc offset 0 rows fetch next 1 rows only');
                // console.log(result.recordset[0].id);
                var id = result.recordset[0].id
                // console.log(id);
        
                // Close the connection
                await sql.close();
                console.log('Connection closed');
                console.log(id);
                await step.context.sendActivity(`Your registered id is ${id}`);
            } 
            catch (err) {
                console.error('Error connecting to the database:', err);
            }
        }
         else {
                await step.context.sendActivity('Thanks. Your profile will not be kept.');
        }
        // console.log("3234");
        // return await step.context.sendActivity(id);

        // if (step.result) {
        //     // Get the current profile object from user state.
        //     const userProfile = await this.userProfile.get(step.context, new UserProfile());

        //     userProfile.transport = step.values.transport;
        //     userProfile.name = step.values.name;
        //     userProfile.age = step.values.age;
        //     userProfile.picture = step.values.picture;

        //     let msg = `I have your mode of transport as ${userProfile.transport} and your name as ${userProfile.name}`;
        //     if (userProfile.age !== -1) {
        //         msg += ` and your age as ${userProfile.age}`;
        //     }

        //     msg += '.';
        //     await step.context.sendActivity(msg);
        //     if (userProfile.picture) {
        //         try {
        //             await step.context.sendActivity(MessageFactory.attachment(userProfile.picture, 'This is your profile picture.'));
        //         } catch {
        //             await step.context.sendActivity('A profile picture was saved but could not be displayed here.');
        //         }
        //     }
        // } else {
        //     await step.context.sendActivity('Thanks. Your profile will not be kept.');
        // }

        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is the end.
        return await step.endDialog();
    }

    async nameValidator(promptContext) {
        // This condition is our validation rule.
        // Ensure the input is a string with only characters (no numbers)
        const regex = /^[A-Za-z]+$/;
        const isValid = promptContext.recognized.succeeded && regex.test(promptContext.recognized.value);
    
        return isValid;
    }  

    async emailValidator(promptContext) {
        // This condition is our validation rule.
        // Ensure the input is a valid email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = promptContext.recognized.succeeded && regex.test(promptContext.recognized.value);
    
        return isValid;
    }
    
    async budgetValidator(promptContext) {
        // This condition is our validation rule.
        // Ensure the input is a valid number
        const regex = /^\d+$/;
        const isValid = promptContext.recognized.succeeded && regex.test(promptContext.recognized.value);
        
        return isValid;
    }
    
    

    // async picturePromptValidator(promptContext) {
    //     if (promptContext.recognized.succeeded) {
    //         var attachments = promptContext.recognized.value;
    //         var validImages = [];

    //         attachments.forEach(attachment => {
    //             if (attachment.contentType === 'image/jpeg' || attachment.contentType === 'image/png') {
    //                 validImages.push(attachment);
    //             }
    //         });

    //         promptContext.recognized.value = validImages;

    //         // If none of the attachments are valid images, the retry prompt should be sent.
    //         return !!validImages.length;
    //     } else {
    //         await promptContext.context.sendActivity('No attachments received. Proceeding without a profile picture...');

    //         // We can return true from a validator function even if Recognized.Succeeded is false.
    //         return true;
    //     }
    // }
}

module.exports.RegisterNow = RegisterNow;
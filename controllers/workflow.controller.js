import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
// Esta línea importa la función createRequire del módulo module de Node.js. 
// createRequire se utiliza para crear una función require que puede cargar módulos CommonJS en un entorno ES Module.
import {createRequire} from "module";
import { sendReminderEmail } from "../utils/send-email.js";


// Aquí se crea una función require utilizando createRequire. 
// Esto permite utilizar require para importar módulos CommonJS en un archivo que utiliza la sintaxis de módulos ES (ESM).
const require = createRequire(import.meta.url);

const {serve} = require("@upstash/workflow/express")


const REMINDERS =[7,5,2,1];

export const sendReminders = serve(async(context) =>{
  const {subscriptionId} = context.requestPayload;
  const subscription = await fetchSubscription(context,subscriptionId)
  
  if(!subscription || subscription.status !== "active") return;
 
  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())){
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return
  }

  for(const daysBefore of REMINDERS){

    const reminderDate = renewalDate.subtract(daysBefore, "day")

    if(reminderDate.isAfter(dayjs())){
      await sleepUntilReminder(context,`Reminder ${daysBefore} days before`, reminderDate)
    }

    // Check if the reminder date is today and trigger the reminder only one time
    if(dayjs().isSame(reminderDate,"day")){
      await triggerReminder(context,`${daysBefore} days before reminder`, subscription)
     
    }
  }

})

const fetchSubscription = async(context,subscriptionId) =>{
  return await context.run("get subscription", async ()=>{
    return Subscription.findById(subscriptionId).populate("user", "name email")
  })
} 

const sleepUntilReminder = async(context,label, date) =>{
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context,label, subscription) =>{
  return await context.run(label, async ()=>{
    console.log(`Triggering ${label}`);
    // send email, SMS, or other notification

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription
    })
  })
}
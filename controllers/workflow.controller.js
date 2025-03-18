import Subscription from "../models/subscription.model.js";
// Esta línea importa la función createRequire del módulo module de Node.js. 
// createRequire se utiliza para crear una función require que puede cargar módulos CommonJS en un entorno ES Module.
import {createRequire} from "module";


// Aquí se crea una función require utilizando createRequire. 
// Esto permite utilizar require para importar módulos CommonJS en un archivo que utiliza la sintaxis de módulos ES (ESM).
const require = createRequire(import.meta.url);

const {serve} = require("@upstash/workflow/express")

export const sendReminders = serve(async(context) =>{
  const {subscriptionId} = context.requestPayload;
  const subscription = await fetchSubscription(context,subscriptionId)

  if(!subscription || subscription.status !== "active") return;

  

})

const fetchSubscription = async(context,subscriptionId) =>{
  return await context.run("get subscription", ()=>{
    return Subscription.findById(subscriptionId).populate("user", "name email")
  })
} 
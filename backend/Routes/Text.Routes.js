const express = require("express");
const { verify } = require('../middleware/jwtAuth.middleware');
const Text = express.Router();
const  OpenAI  = require("openai");
const { HistoryModel } = require("../Models/history.model");

require("dotenv").config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY ||"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"});

Text.post('/generate',verify, async (req, res) => {
    try { 
        const { topic, language, blockedWord } = req.body;
        // console.log(topic, language,blockedWord );

        const response = await main(topic, language, blockedWord)
       //saving Data in history model
        let data= response[0].message.content
        // console.log("USER ID", req.body);
        const history = new HistoryModel({
          body: data,
          userID: req.body.userId,
          type:"generate Content",
          date: Date(),
        });
        await history.save();
    
        //display the response from OPen AI
        res.json( response[0].message );
    
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
   
})

async function main(topic, language, blockedWord) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Certainly! Please provide the topic you'd like me to explain, and I'll provide detailed information on it."
      },  
      { role: 'user', 
      content: `I want you to provide detailed information on the topic of ${topic}. Please explain it in a way that is easy to understand. Use ${language} language to explain and ensure the explanation contains more than 40 words and not more that 100 words` }],
    
    model: 'gpt-3.5-turbo', //GPT-3.5 Turbo (now $0.0015 per 1K input tokens)
    temperature:0.7,
    max_tokens:256,
    top_p:1,
    frequency_penalty:1,
    presence_penalty:0,
    stop:[`${blockedWord}`]
  
  });

  return(chatCompletion.choices);
}


Text.post('/consize',verify, async (req, res) => {
  try { 
      const { info,length, blockedWord } = req.body;
      // console.log(info, length,blockedWord );

      const response = await main2(info, length, blockedWord)
     //saving Data in history model
      let data= response[0].message.content
      // console.log("USER ID", req.body);
      const history = new HistoryModel({
        body: data,
        userID: req.body.userId,
        type:"consize Content",
        date: Date(),
      });
      await history.save();
  
      //display the response from OPen AI
      res.json( response[0].message );
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
 
})
async function main2(info, length, blockedWord) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Certainly! Please provide the data you'd like me to consize, and I'll provide consized information on it."
      },  
      { role: 'user', 
      content: `I have a piece of information that could be long. I would like you to summarize it in less than ${length} words, and ensure the summarized information is easy to understand and well constructed as well , and here I am providing you the information \n ${info}` }],
    
    model: 'gpt-3.5-turbo', //GPT-3.5 Turbo (now $0.0015 per 1K input tokens)
    temperature:0.7,
    max_tokens:500,
    top_p:1,
    frequency_penalty:1,
    presence_penalty:0,
    stop:[`${blockedWord}`]
  
  });

  return(chatCompletion.choices);
}

Text.post('/translate',verify, async (req, res) => {
  try { 
      const { info,language } = req.body;
      // console.log(info, language );

      const response = await main3(info, language)
     //saving Data in history model
      let data= response[0].message.content
      // console.log("USER ID", req.body);
      const history = new HistoryModel({
        body: data,
        userID: req.body.userId,
        type:"Content translate",
        date: Date(),
      });
      await history.save();
  
      //display the response from OPen AI
      res.json( response[0].message );
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
 
})
async function main3(info, language) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Certainly! Please provide the data you'd like me to transate, and I'll provide translated information on it in desired language."
      },  
      { role: 'user', 
      content: `I have some information and I would like you to translate that information in ${language},make sure no text is trimmed or left ,provide exact translation  and here I am providing you the information \n ${info}` }],
    
    model: 'gpt-3.5-turbo', //GPT-3.5 Turbo (now $0.0015 per 1K input tokens)
    temperature:0.7,
    max_tokens:500,
  });

  return(chatCompletion.choices);
}






module.exports = { Text };
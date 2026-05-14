const express = require("express");

const router = express.Router();

const axios = require("axios");


router.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model: "meta-llama/llama-3-8b-instruct",

                messages: [

                    {
                        role: "system",
                        content: `
                        You are a healthcare assistant.

                        Give only general health guidance.

                        Keep answers short and easy.

                        Always say:
                        "Not medical advice. Consult a doctor."
                        `
                    },

                    {
                        role: "user",
                        content: message
                    }

                ]

            },

            {

                headers: {

                    "Authorization":
                    `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"

                }

            }

        );

        res.json({

            reply:
            response.data.choices[0].message.content

        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({

            error: "AI Error"

        });

    }

});

module.exports = router;
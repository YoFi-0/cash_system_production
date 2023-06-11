import stripe from 'stripe'

const money = new stripe(process.env.STRIPE_SK!, {
    typescript:true,
    apiVersion:"2022-11-15"
})

export default money
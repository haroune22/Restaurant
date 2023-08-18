'use client'
import CheckoutForm from "@/Components/CheckoutForm";
import Loading from "@/Components/Loading";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PayPage = ({ params }: { params: { id: string } }) => {
  const { status } = useSession();
    const {id} = params;
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const makeRequest = async () => {

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL!}/api/create-intent/${id}`,
              {
                method: "POST",
              }
            );
            const data = await res.json();
            setClientSecret(data.clientSecret);
          } catch (err) {
            console.log(err);
          }
        };
    
        makeRequest();
      }, [id]);
      
    const options:StripeElementsOptions={
        clientSecret,
        appearance:{
          theme:"stripe"
        }
      }
      if (status === "loading") {
        return (
        <div className='flex items-center justify-center w-full h-[100vh] '>
            <Loading/>
          </div>
        )
      }
  return (
    <div>
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PayPage
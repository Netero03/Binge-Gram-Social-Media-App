import { zodResolver } from "@hookform/resolvers/zod";
import {Link,useNavigate} from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/ui/shared/Loader";
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

 
const SigninForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading:isUserLoading}= useUserContext();
  const navigate=useNavigate();

  const{mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();
 

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:'',
      password:'',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if(!session){
      return toast({
        title: "Sign in failed. Please try again",
        description: "Friday, February 10, 2023 at 5:57 PM",})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate('/')
    }else{
      return toast({title:'Sign in failed. Please try again.'})
    }
  }
  return (
  <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src='/assets/images/binge-logo-croped-light.png' className="w-40 h-16 pb-2"/>
      
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12"> Login to your account </h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">Welcome Back to BingeGram! Enter login details</p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <div className="relative inline-flex  group flex justify-center items-center w-36 left-32">
          <div
              className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
          </div>
          <Button type="submit" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ):"Sign in"}
          </Button>
        </div>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account?
          <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1"> Sign Up</Link>
        </p>
      </form>
    </div>
  </Form>
  )
}

export default SigninForm
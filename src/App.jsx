import { useEffect } from "react";
import { useRef } from "react";
import { useReducer } from "react"
import LearnZod from "./LearnZod";
import "./App.css"
import ReactQureyTemplate from "./ReactQureyTemplate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const App = () => {
  const initialValue = { mode: "buy", price: 0 }
  const red = (state, action) => {
    switch (action.type) {
      case "buy":
        if (action.price > 1) {
          alert(`are your sure to ${action.type} product with ${action.price}$`)
          console.log(`you ${action.type} product with ${action.price}$`);
          return { mode: "buy", price: action.price }
        }
        console.log(action);
        return { mode: "unknown" }
      case "sale":
        console.log(`you ${action.type} product with ${action.price}$`);
        return { mode: `${action.type}`, price: action.price }
      default:
        return { mode: "no found action", price: action.price }
    }
  }
  const rangeValue = useRef()
  useEffect(() => {
    // console.log(rangeValue?.current?.value);
  }, [rangeValue])
  const [mode, dispatch] = useReducer(red, initialValue);
  const handelBuyAction = () => {
    dispatch({ type: "buy", price: rangeValue.current?.value })
  }
  const handelSaleAction = () => {
    dispatch({ type: "sale", price: rangeValue.current?.value })
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  })
  return (
    // <div>
    //   <input ref={rangeValue} type="range" defaultValue={mode.price} min={1} max={10} />
    //   <button onClick={handelBuyAction}>Buy</button>
    //   <button onClick={handelSaleAction}>Sale</button>
    // </div>
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ReactQureyTemplate />
      </QueryClientProvider>
      {/* <LearnZod /> */}
    </>
  )
}

export default App
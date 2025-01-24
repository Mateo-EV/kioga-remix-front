import { useRef } from "react"
import { Button } from "@/components/ui/button"

type ManageCartQuantityProps = {
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  defaultQuantity?: number
}

function ManageCartQuantity({
  setQuantity,
  defaultQuantity = 1
}: ManageCartQuantityProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex">
      <Button
        className="rounded-r-none"
        variant="secondary"
        size="icon"
        onClick={() => {
          setQuantity(prevQuantity => {
            if (prevQuantity <= 1) {
              inputRef.current!.value = "1"
              return 1
            } else {
              inputRef.current!.value = String(prevQuantity - 1)
              return prevQuantity - 1
            }
          })
        }}
      >
        -
      </Button>
      <input
        type="text"
        className="w-10 rounded-md border border-input bg-background text-center outline-none md:w-20"
        ref={inputRef}
        defaultValue={defaultQuantity}
        onChange={e => {
          const value = e.target.value
          if (value === "") {
            setQuantity(1)
            return
          }
          const formattedValue = Number(value)
          if (isNaN(formattedValue)) {
            setQuantity(1)
            inputRef.current!.value = ""
          } else if (formattedValue >= 10) {
            setQuantity(10)
            inputRef.current!.value = "10"
          } else if (formattedValue <= 0) {
            setQuantity(1)
            inputRef.current!.value = "1"
          } else {
            setQuantity(formattedValue)
          }
        }}
        onBlur={e => {
          const value = e.target.value
          if (value === "") inputRef.current!.value = "1"
        }}
      />
      <Button
        className="rounded-l-none"
        variant="secondary"
        size="icon"
        onClick={() => {
          setQuantity(prevQuantity => {
            if (prevQuantity >= 10) {
              inputRef.current!.value = "10"
              return 10
            } else {
              inputRef.current!.value = String(prevQuantity + 1)
              return prevQuantity + 1
            }
          })
        }}
      >
        +
      </Button>
    </div>
  )
}

export default ManageCartQuantity

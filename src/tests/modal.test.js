import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import Modal from "../components/Modal"

const modalMock = {
    sprites: {
        front_default: "urltest.com"
    },
    id:"1",
    name: "pokemon",
    types:[
        {
            type:{
                name:"type1"
            }
        }
    ],
    weight: 1000,
    height: 20
}

const closeModalMock = jest.fn()

describe("Modal", () => {
    test("Testar renderização do modal", async () => {
        render(<Modal activeModal={modalMock} closeModal={closeModalMock}/>)
        
        const image = screen.getByRole('img', {name: /pokemon/i})
        const title = screen.getByText(/pokemon/i)
        const weight = screen.getByText(/100\.0 kg/i)
        const height = screen.getByText(/2\.0 m/i)
        const id = screen.getByRole('heading', {name: /#1 pokemon/i})
        const type = screen.getByText(/type1/i)
        const button = screen.getByRole('button', {name: /❌/i})

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
    test("test fechar modal", async () => {
        const user = userEvent.setup()
        render(<Modal activeModal={modalMock} closeModal={closeModalMock}/>)

        const button = screen.getByRole('button', {name: /❌/i})

        await user.click(button)

        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()
    })

})
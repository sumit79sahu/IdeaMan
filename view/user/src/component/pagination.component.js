import { useState, useEffect } from "react"
// import { Button } from "react-bootstrap"

export default function PaginationComponent(props) {
    const [counter, setCounter] = useState(1)
    const onButtonClick = async (e, string) => {
        if (string === "Previous") {
            if (counter === 1) {
                setCounter(1)
            }
            else {
                setCounter(counter - 1)
            }
        }
        else {
            if (counter === props.noofButton) {
                setCounter(props.noofButton)
            }
            else {
                setCounter(counter + 1)
            }
        }
    }

    useEffect(() => {
        const end = props.showperpage * counter;
        const start = end - props.showperpage
        props.OnPagination(start, end)
    }, [counter])
    return (
        <>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={(e) => onButtonClick(e, "Previous")}>Previous</a></li>
                        {
                            props.noofButton.map((data,index) => {
                                {/* console.log(noofpages) */}
                                return (
                                    <>
                                        <li className={`page-item ${index+1 == counter ? "active" : null}`} onClick={() => setCounter(index+1)}><a class="page-link" >{index+1}</a></li>
                                    </>
                                )
                            })
                        }
                        <li className="page-item"><a className="page-link" onClick={(e) => onButtonClick(e, "Next")}>Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
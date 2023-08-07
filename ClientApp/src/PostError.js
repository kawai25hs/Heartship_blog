import { useRouteError } from "react-router-dom"

export default function PostError() {
    const error = useRouteError()

    return (
    <div className="notFoundWrapper">
        <div style={{ padding: '400px 0', margin: '0 auto', maxWidth: '1200px', fontSize: '28px'}}>
            <p style={{ fontSize: '72px'}}>Error!</p>
            <p className="greywords">{error.message}</p>
        </div>

    </div>        
    )
}
import { Button } from "@/components/ui/button"
import { clearAuthCookies, getRefreshToken } from "@/lib/auth"
import { useNavigate } from "react-router"
import { useState } from "react"

export default function Home(props) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const handleLogout = async () => {
		setError("")
		setLoading(true)
		try {
			window.location.href = 'http://localhost:8080/realms/test/protocol/openid-connect/logout'
		} catch (e) {
			setError("登出失败，请稍后重试")
		} finally {
			clearAuthCookies()
			navigate("/login")
			setLoading(false)
		}
	}

	return (
		<div className="p-4">
			<div className="mb-2">Home</div>
			{error ? <div className="text-red-500 text-sm mb-2">{error}</div> : null}
			<Button className="text-black" onClick={handleLogout} disabled={loading}>{loading ? "正在退出..." : "退出登录"}</Button>
		</div>
	)
}
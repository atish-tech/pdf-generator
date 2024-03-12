import jsonwebtoken from "jsonwebtoken";

export const userMiddleware = async (req: any, res: any, next: any) => {
    const token = await req.headers.authorization.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "User Unauthorized" });
    }

    try {
        const user: any = jsonwebtoken.verify(token, process.env.JWT_SECRET!);
         
        req.userId = user.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "User Unauthorized" });
    }
}
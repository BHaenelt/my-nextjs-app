import {getDataFromToken}from "@/lib/getDataFromToken";

import{NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import {connect} from "@/lib/dbConfig"; 

connect();


export async function GET(request: NextRequest){
    try{
     const userID= await  getDataFromToken(request); //verifying token
      const user= await User.findOne({_id:userID})
        .select("-password");
        return NextResponse.json({
            message: " User Found",
            data: user
        })

    }catch(error:any){
        return NextResponse.json({
            error:error.message
        }

        )
    }
}
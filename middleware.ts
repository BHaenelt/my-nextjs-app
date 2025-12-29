import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
// importing NextResponse and NextRequest from next/server
//so we cnan use them in middlware fucntion
//to handle requests and responses


//export function middleware to call it in other files
//first posrtion is Logic of middleware
export function middleware(request: NextRequest){
    const path= request.nextUrl.pathname; //get the path from the request URL
    const isPublicPath = path === '/login' || path === '/signup'; //check if path is public
const token =
request.cookies.get('token')?.value
|| ''; //get the token from cookies

if(isPublicPath && token){  
    return NextResponse.redirect(
        new URL ('/', request.nextUrl)
    );
    //if there is token and user tries to access login or signup page
    //redirect them to home page
}
if (!isPublicPath && !token){  
    return NextResponse.redirect(
        new URL('/login', request.nextUrl)
    )
//if no token and user tried to access 
//protected page redirect to login
}
}





//2nd portion is config the paths
//where middleware will be applied
export const config ={
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ]
}
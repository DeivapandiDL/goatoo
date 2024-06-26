import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  private envUrl = environment.url;

  // base_path = 'http://localhost:3000/';
  base_path = environment.url;
public getData:string = "geting from service data";
private menuId = new BehaviorSubject<any>({});
menuChange = this.menuId.asObservable();
changeMenu(newUser){
  this.menuId.next(newUser); 
}

private locationSet = new BehaviorSubject<string>('john');
   castLocation = this.locationSet.asObservable();
   
   editLocation(loc){
     this.locationSet.next(loc); 
   }



adminProductId:string = '';
private userData = new BehaviorSubject<any>({});
userAdd = this.userData.asObservable();

userAuth(User){
  this.userData.next(User); 
}

private countProduct = new BehaviorSubject<any>([]);
productCountChange = this.countProduct.asObservable();

changeCount(newcount){
  this.countProduct.next(newcount);
}

public product:any = {};


  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
 // Handle API errors
 handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      'Backend returned code ', error.status, 
      'body was: ', error.error);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};


// get user list
getList(){
  return this.http
    .get(this.base_path+'customer')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

getProductList(){
  return this.http
    .get(this.base_path+'product')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}




getDeliveryBoyList(){
  return this.http
    .get(this.base_path+'getDeliveryBoyList')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

getdeliveryboy(id){
  return this.http.get(this.base_path+'getdeliveryboy/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

deliveryboyExist(phNO){
  return this.http.get(this.base_path+'deliveryboyExist/'+phNO).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

branchAdminExist(phNO){
  return this.http.get(this.base_path+'branchAdminExist/'+phNO).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

getbranchadmin(id){
  return this.http.get(this.base_path+'getbranchadmin/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}



location(){
  return this.http
    .get(this.base_path+'location')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



getBranchAdminList(){
  return this.http
    .get(this.base_path+'getBranchAdminList')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

getCategoryList(){
  return this.http.get(this.base_path+'getCategory').pipe(
    retry(2),
    catchError(this.handleError)
  )
}


createCategory(item){
  return this.http
    .post<[]>(this.base_path+'createCategory/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}


createSubCategory(item){
  return this.http
    .post<[]>(this.base_path+'createSubCategory/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}




getSubCategory(){
  return this.http.get(this.base_path+'getSubCategory').pipe(
    retry(2),
    catchError(this.handleError)
  )
}

getProducts(){
  return this.http.get(this.base_path+'getProducts').pipe(
    retry(2),
    catchError(this.handleError)
  )
}

getCategoryProduct(id){
  return this.http.get(this.base_path+'getCategoryProduct/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

// get single product details

getProductDetails(id){
  console.log("tested for get product details TESETD" +environment.url);
  return this.http.get(environment.url+'getProductDetails/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
deleteproduct(id){
  return this.http.get(this.base_path+'deleteproduct/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//insert new customer
// public createCustomersssss(customer){
//   let cust = JSON.stringify(customer);
//   console.log(cust);
//   return this.http.post(this.base_path+'addCustomer/',cust,this.httpOptions).pipe(
//     retry(2),
//     catchError(this.handleError)
//   );
// }

createCustomer(item): Observable<[]> {
  console.log(item);
  return this.http
    .post<[]>(this.base_path+'addCustomer/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}




createDeliveryBoy(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'createDeliveryBoy',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
) 
}


createBranchAdmin(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'createBranchAdmin',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
) 
}





//get cart details
getCart(){
  return this.http.get(this.base_path+'getCart').pipe(
    retry(2),
    catchError(this.handleError)
  )
}




addCart(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 return this.http.post(this.base_path+'addCart',data,{headers: headers}).pipe(
  retry(2),
  catchError(this.handleError)
)
}


changeProductStatus(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 return this.http.post(this.base_path+'changeProductStatus',data,{headers: headers}).pipe(
  retry(2),
  catchError(this.handleError)
)
}

changeDeliveryBoyStatus(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 return this.http.post(this.base_path+'changeDeliveryBoyStatus',data,{headers: headers}).pipe(
  retry(2),
  catchError(this.handleError)
)
}


changeBranchAdminStatus(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 return this.http.post(this.base_path+'changeBranchAdminStatus',data,{headers: headers}).pipe(
  retry(2),
  catchError(this.handleError)
)
}



getRelatedProducts(id){
  return this.http.get(this.base_path+'getRelatedProductsList/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
getProductBySubCategory(id){
  return this.http.get(this.base_path+'getRelatedProductsList/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
getLoginDetails(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  return this.http.post(this.base_path+'checkCustomer',data, {headers: headers}).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

checkBranchAdmin(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  return this.http.post(this.base_path+'checkBranchAdmin',data, {headers: headers}).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

checkDeliveryBoy(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  return this.http.post(this.base_path+'checkDeliveryBoy',data, {headers: headers}).pipe(
    retry(2),
    catchError(this.handleError)
  )
}




getAddProductDetails(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'addNewProduct',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}


productImageUpload(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'productImageUpload',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}

updateCustomer(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'editCustomer',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}
// updateCustomer(item): Observable<[]> {
//   console.log(item);
//   return this.http
//     .post<[]>(this.base_path+'editCustomer/', JSON.stringify(item), this.httpOptions)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }



getCustomerProduct(id){
  return this.http.get(this.base_path+'getCustomerProduct/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

editProduct(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'editProduct',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}


EditBranchAdmin(data){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',data);
 return this.http.post(this.base_path+'EditBranchAdmin',data,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}

getWishlist(id){
  return this.http.get(this.base_path+'getWishlist/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

getSubCategorybyCatId(id){
  return this.http.get(this.base_path+'getSubCategorybyCatId/'+id).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

postWishlist(obj){
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded;text/plain; charset=utf-8');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  console.log('add new product',obj);
 return this.http.post(this.base_path+'wishlist',obj,{headers: headers ,responseType: 'text'}).pipe(
  retry(2),
  catchError(this.handleError)
)
}

deleteWishlist(id){
  return this.http.get(this.base_path+'deleteWishlist/'+id).pipe(
  retry(2),
  catchError(this.handleError)
)
}


productimage(){
  return this.http.get(this.base_path+'productimage').pipe(
    retry(2),
    catchError(this.handleError)
  ) 
}


insertProductImage(item){
  console.log("service test");
  return this.http
    .post<[]>(this.base_path+'insertProductImage/', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}




getProductImage(id){
  return this.http.get(this.base_path+'getProductImage/'+id).pipe(
  retry(2),
  catchError(this.handleError)
)
}

getAllProductImage(){
  return this.http.get(this.base_path+'productimage/').pipe(
  retry(2),
  catchError(this.handleError)
)
}



deliveryboyPwd(email){
  return this.http.get(this.base_path+'deliveryboyPwd/'+email).pipe(
  retry(2),
  catchError(this.handleError)
)
}

branchadminPwd(email){
  return this.http.get(this.base_path+'branchadminPwd/'+email).pipe(
  retry(2),
  catchError(this.handleError)
)
}
}
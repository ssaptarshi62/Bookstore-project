import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    .toFixed(2);
  const {currentUser}= useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder,{isLoading ,error}] = useCreateOrderMutation()
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit =async (data) => {

    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productDetails: cartItems.map((item) => ({
        id: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.newPrice,
      })),
      totalPrice: totalPrice,
    };

    try{
      await createOrder(newOrder).unwrap();
      alert("Your order has been placed successfully");
      navigate('/orders');

    }catch(error){
      console.error("Eorror while placeing a order",error);
      alert("Fail to place an order")
      
    }
    // Add code here to submit the order to your backend or API
  };
  if(isLoading) return <div>Loading...</div>
  if(cartItems.length == 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">
          Your cart is empty. <Link to="/" className="text-blue-500 underline">Continue shopping</Link>.
        </h2>
      </div>
    )
  }
  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register('name', { required: 'Full name is required' })}
                        type="text"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        {...register('email')}
                        type="text"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                        disabled
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="number"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="+123 456 7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register('address', { required: 'Address is required' })}
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        type="text"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        {...register('country', { required: 'Country is required' })}
                        type="text"
                        id="country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs">{errors.country.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        {...register('state', { required: 'State is required' })}
                        type="text"
                        id="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register('zipcode', { required: 'Zipcode is required' })}
                        type="text"
                        id="zipcode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-xs">{errors.zipcode.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="billing_same"
                          className="form-checkbox"
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{' '}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Terms & Conditions
                          </Link>{' '}
                          and{' '}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Shopping Policy.
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <button
                        disabled={!isChecked}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Order Summary */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-600">Order Summary</h3>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between py-2">
                    <div>
                      {item.title} <span className='text-red-500'>(x{item.quantity})</span>
                    </div>
                    <div>${(item.newPrice * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-300 pt-4">
                  <div className="font-semibold">Total</div>
                  <div>${totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

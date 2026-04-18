export interface CheckoutData {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    country: string;
    zone: string;
    comment: string;
}

export const validCheckoutData: CheckoutData = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'correo@example.com',
    telephone: '573001112233',
    company: 'Opencart',
    address1: 'Calle 123',
    address2: 'Avenida 8',
    city: 'Ciudad',
    postcode: '604444',
    country: '47',
    zone: '747',
    comment: 'Comentario para el textarea'
};

export const invalidCheckoutData: Partial<CheckoutData>[] = [
    { email: 'invalid-email' },
    { telephone: '' },
    { firstName: '' },
    { address1: '' },
    { city: '' },
    { postcode: '' }
];

export const randomCheckoutData: CheckoutData[] = [
    {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        telephone: '1234567890',
        address1: 'Street 1',
        city: 'Test City',
        postcode: '12345',
        country: '47',
        zone: '47',
        comment: 'Test comment'
    }
];
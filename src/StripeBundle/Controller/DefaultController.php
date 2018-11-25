<?php

namespace StripeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        \Stripe\Stripe::setApiKey("sk_test_MBp0yRZ2gsvaHaFetLNGn55W");

        $charge = \Stripe\Charge::create([
            'amount' => 999,
            'currency' => 'usd',
            'source' => 'tok_visa',
            'receipt_email' => 'jenny.rosen@example.com',
        ]);

        return $this->redirect('/inicio');
    }
}

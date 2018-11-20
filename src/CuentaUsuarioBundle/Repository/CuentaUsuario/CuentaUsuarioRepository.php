<?php
/**
 * Created by PhpStorm.
 * User: hector
 * Date: 18/11/2018
 * Time: 10:37
 */

namespace CuentaUsuarioBundle\Repository\CuentaUsuario;


class CuentaUsuarioRepository  extends \Doctrine\ORM\EntityRepository
{

    public function saludar(){
        return 'Hola mundo';
    }
}


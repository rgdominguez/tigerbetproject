<?php

namespace ModelosBundle\Entity;

/**
 * Apuestas
 */
class Apuestas
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $apostado;

    /**
     * @var integer
     */
    private $disponible;

    /**
     * @var \DateTime
     */
    private $fechaApuesta = 'CURRENT_TIMESTAMP';

    /**
     * @var \ModelosBundle\Entity\Juegos
     */
    private $idJuego;

    /**
     * @var \ModelosBundle\Entity\Usuarios
     */
    private $idUsuario;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set apostado
     *
     * @param integer $apostado
     *
     * @return Apuestas
     */
    public function setApostado($apostado)
    {
        $this->apostado = $apostado;

        return $this;
    }

    /**
     * Get apostado
     *
     * @return integer
     */
    public function getApostado()
    {
        return $this->apostado;
    }

    /**
     * Set disponible
     *
     * @param integer $disponible
     *
     * @return Apuestas
     */
    public function setDisponible($disponible)
    {
        $this->disponible = $disponible;

        return $this;
    }

    /**
     * Get disponible
     *
     * @return integer
     */
    public function getDisponible()
    {
        return $this->disponible;
    }

    /**
     * Set fechaApuesta
     *
     * @param \DateTime $fechaApuesta
     *
     * @return Apuestas
     */
    public function setFechaApuesta($fechaApuesta)
    {
        $this->fechaApuesta = $fechaApuesta;

        return $this;
    }

    /**
     * Get fechaApuesta
     *
     * @return \DateTime
     */
    public function getFechaApuesta()
    {
        return $this->fechaApuesta;
    }

    /**
     * Set idJuego
     *
     * @param \ModelosBundle\Entity\Juegos $idJuego
     *
     * @return Apuestas
     */
    public function setIdJuego(\ModelosBundle\Entity\Juegos $idJuego = null)
    {
        $this->idJuego = $idJuego;

        return $this;
    }

    /**
     * Get idJuego
     *
     * @return \ModelosBundle\Entity\Juegos
     */
    public function getIdJuego()
    {
        return $this->idJuego;
    }

    /**
     * Set idUsuario
     *
     * @param \ModelosBundle\Entity\Usuarios $idUsuario
     *
     * @return Apuestas
     */
    public function setIdUsuario(\ModelosBundle\Entity\Usuarios $idUsuario = null)
    {
        $this->idUsuario = $idUsuario;

        return $this;
    }

    /**
     * Get idUsuario
     *
     * @return \ModelosBundle\Entity\Usuarios
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }
}


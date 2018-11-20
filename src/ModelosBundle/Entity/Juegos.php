<?php

namespace ModelosBundle\Entity;

/**
 * Juegos
 */
class Juegos
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $nombre;

    /**
     * @var string
     */
    private $imagen;

    /**
     * @var \ModelosBundle\Entity\Subcategoria
     */
    private $idSubcategoria;


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
     * Set nombre
     *
     * @param string $nombre
     *
     * @return Juegos
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set imagen
     *
     * @param string $imagen
     *
     * @return Juegos
     */
    public function setImagen($imagen)
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * Get imagen
     *
     * @return string
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * Set idSubcategoria
     *
     * @param \ModelosBundle\Entity\Subcategoria $idSubcategoria
     *
     * @return Juegos
     */
    public function setIdSubcategoria(\ModelosBundle\Entity\Subcategoria $idSubcategoria = null)
    {
        $this->idSubcategoria = $idSubcategoria;

        return $this;
    }

    /**
     * Get idSubcategoria
     *
     * @return \ModelosBundle\Entity\Subcategoria
     */
    public function getIdSubcategoria()
    {
        return $this->idSubcategoria;
    }
}


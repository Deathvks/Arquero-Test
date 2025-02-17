package com.prueba.arquero.pruebaarquerobackend.model.dao;

import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import org.springframework.data.repository.CrudRepository;

public interface IEmpleadoDao extends CrudRepository<Empleado, Long> {


}

// what this controller method does => get all bootcamps 
// routes => GET/api/v1/bootcamps 
// who can access this endpoint => Public

 getBootcamps = (req,res, next) =>{ 

    res.status(200).json({
        success: true,
        msg: 'Show all bootcamps'
    });
} 

// what this controller method does => get a single bootcamp
// routes => GET/api/v1/bootcamps/:id 
// who can access this endpoint => Public

 getSingleBootcamps = (req,res, next) =>{  
    res.status(200).json({
        success: true, 
        msg: `Show bootcamp ${req.params.id}`
    });

} 

// what this controller method does => create new bootcamp
// routes => POST/api/v1/bootcamps 
// who can access this endpoint => Private

 createBootcamp = (req,res, next) =>{ 
    res.status(200).json({
        success: true,
        msg: 'Create a new bootcamp'
    });
}  

// what this controller method does => updates a bootcamp
// routes => PUT/api/v1/bootcamps/:id 
// who can access this endpoint => Private

 updateBootcamp = (req,res, next) =>{ 
    res.status(200).json({
        success: true,
        msg: `Update Bootcamp ${req.params.id}`
    });
}  

// what this controller method does => deletes a bootcamp
// routes => DELETE/api/v1/bootcamps/:id
// who can access this endpoint => Private

 createBootcamp = (req,res, next) =>{ 
    res.status(200).json({
        success: true,
        msg: 'Create a new bootcamp'
    });
} 
 

export { getBootcamps, getSingleBootcamp, createBootcamp, updateBootcamp, deleteBootcamp };


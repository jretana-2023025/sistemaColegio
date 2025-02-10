import {body} from 'express-validator'
import {validateErrors} from "./validate.error.js"
import {existUsername } from '../utils/db.validator.js'


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({ min: 8 }),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    body('role', 'Role cannot be changed')
        .not()
        .exists(),
    validateErrors
]

export const loginValidator = [
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty(),
    validateErrors
]

export const updateStudentValidator = [
    body("name", "Name cannot be empty and must only contain letters")
        .optional()
        .notEmpty()
        .withMessage("Name can only contain letters and spaces"),
    
    body("surname", "Surname cannot be empty and must only contain letters")
        .optional()
        .notEmpty()
        .withMessage("Surname can only contain letters and spaces"),
    body("username", "Username cannot be empty and must be unique")
        .optional()
        .notEmpty()
        .isLength({ max: 15 })
        .withMessage("Username cannot exceed 15 characters")
        .withMessage("Username can only contain letters, numbers, and underscores")
        .custom(existUsername),
    body("email", "Email cannot be empty or is not a valid email")
        .isEmail()
        .optional()
        .notEmpty()
        .withMessage("Invalid email format"),
    body("password", "Password cannot be changed")
        .not()
        .exists(),
    body("phone", "Phone cannot be empty or is not a valid phone number")
        .optional()
        .notEmpty()
        .withMessage("Phone number must be exactly 8 digits"),
    body("role", "Role cannot be changed")
        .not()
        .exists(),

]

export const validateUpdateCourse = [
    body("name", "Name cannot be empty and must be between 3 and 100 characters")
        .optional()
        .notEmpty()
        .isLength({ min: 3, max: 100 }),
    body("description", "Description cannot be empty and must be between 5 and 500 characters")
        .optional()
        .notEmpty()
        .isLength({ min: 5, max: 500 }),
]

export const validateCreateCourse = [
    body("name", "Name cannot be empty and must be between 3 and 100 characters")
        .notEmpty()
        .isLength({ min: 3, max: 100 })
        .withMessage("Name must be between 3 and 100 characters"),
    body("description", "Description cannot be empty and must be between 5 and 500 characters")
        .notEmpty()
        .isLength({ min: 5, max: 500 })
        .withMessage("Description must be between 5 and 500 characters"),
];
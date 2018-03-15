# Special Offer Prototype
Prototype API implementation using HAL response type for returning special offer information.

## Features
Swagger integration at <website>/swagger
HAL output formatting when using application/hal+json or application/hal+xml output format

## Known Issues
Swagger incorrectly reports that paging parameters are required despite the API methods defining these parameters with defaults.
This is due to a bug in Swashbuckle concerned with how it determines required parameters.
We don't use the WebApi.Hal nuget package as it has not yet been build for .NET Standard 2.0 and causes build issues without it.
We're using code from the underlying GitHub repository.

## Notes
The API is location aware which seems a little out of sorts - location awareness should probably be exposed as locationId
rather than countyId so that it would be possible to get the locationId for a region or county or some other grouping via
an alternative API endpoint.

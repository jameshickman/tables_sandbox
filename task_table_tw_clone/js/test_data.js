const build_text_span = (t) => {
    const el_span = document.createElement('span');
    el_span.innerText = t;
    return el_span;
}

const test_data = [
    {
        "uid": "a0e9fdcb-8473-4d7d-b37a-b47169d27d1d",
        "name": "Row 1",
        "cells": [
            build_text_span("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
            build_text_span("In non hendrerit erat. Fusce facilisis tellus eget nisi efficitur pellentesque."),
            build_text_span("Integer ac posuere sem."),
            build_text_span("Nullam magna nunc, dignissim ut auctor ac, tristique non lectus."),
            build_text_span("Vestibulum fringilla ante facilisis urna aliquam, eget pharetra sapien commodo."),
            build_text_span("Morbi nec porttitor turpis, sit amet dapibus arcu. Cras eget justo eu dui vestibulum placerat. Duis faucibus arcu sit amet volutpat tempus.")
        ]
    },
    {
        "uid": "316a8bd2-a644-4ea5-9633-ebfcde406dd3",
        "name": "Row 2",
        "cells": [
            build_text_span("Donec id condimentum sapien, eget faucibus nibh. Morbi blandit lectus sagittis malesuada vestibulum."),
            build_text_span("Duis purus diam, porta a eros vitae, commodo aliquam est."),
            build_text_span("Suspendisse interdum fringilla sapien efficitur ullamcorper."),
            build_text_span("Cras eget tellus sit amet enim efficitur consectetur."),
            build_text_span("Aenean egestas sem non ex varius, ut eleifend risus condimentum."),
            build_text_span("Ut non sapien quis ante dapibus condimentum. Proin tempus in massa sed tristique. ")
        ],
        "expanded": true,
        "children": [
            {
                "uid": "6957d727-c3ed-421c-ae46-ee195ae09231",
                "name": "Row 3",
                "cells": [
                    build_text_span("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
                    build_text_span("In non hendrerit erat. Fusce facilisis tellus eget nisi efficitur pellentesque."),
                    build_text_span("Integer ac posuere sem."),
                    build_text_span("Nullam magna nunc, dignissim ut auctor ac, tristique non lectus."),
                    build_text_span("Vestibulum fringilla ante facilisis urna aliquam, eget pharetra saien commodo."),
                    build_text_span("Morbi nec porttitor turpis, sit amet dapibus arcu.")
                ],
                "expanded": false,
                "children": [
                    {
                        "uid": "e5ba7176-45dd-43cc-a239-0b4455d9a39e",
                        "name": "Row 4",
                        "cells": [
                            build_text_span("Cras eget tellus sit amet enim efficitur consectetur."),
                            build_text_span("Aenean egestas sem non ex varius, ut eleifend risus condimentum."),
                            build_text_span("Ut non sapien quis ante dapibus condimentum."),
                            build_text_span("Proin tempus in massa sed tristique."),
                            build_text_span("Morbi gravida, nisl et vehicula semper, orci eros dignissim metus, et congue ipsum nulla id libero."),
                            build_text_span("Sed vel enim purus.")
                        ]
                    }
                ]
            },
            {
                "uid": "eb609c77-cc70-4e5a-9e0c-7039513a1ecd",
                "name": "Row 5",
                "cells": [
                    build_text_span("Cras eget justo eu dui vestibulum placerat."),
                    build_text_span("Duis faucibus arcu sit amet volutpat tempus."),
                    build_text_span("Donec id condimentum sapien, eget faucibus nibh."),
                    build_text_span("Morbi blandit lectus sagittis malesuada vestibulum."),
                    build_text_span("Duis purus diam, porta a eros vitae, commodo aliquam est."),
                    build_text_span("Suspendisse interdum fringilla sapien efficitur ullamcorper.")
                ]
            }
        ]
    },
    {
        "uid": "a39d8db2-133c-4918-a2d5-970d4040fff0",
        "name": "Row 6",
        "cells": [
            build_text_span("Morbi gravida, nisl et vehicula semper, orci eros dignissim metus, et congue ipsum nulla id libero."),
            build_text_span("Sed vel enim purus. Nam bibendum pretium fermentum. Praesent non egestas erat. Integer viverra auctor posuere."),
            build_text_span("Nam vulputate nec est eget vulputate. Phasellus at vestibulum ante."),
            build_text_span("Praesent auctor nulla id molestie facilisis. Fusce pretium elit a justo tempus, id vehicula nisl pharetra."),
            build_text_span("Phasellus a tortor vel dui ultrices ullamcorper sed quis lectus."),
            build_text_span("")
        ]
    },
    {
        "uid": "dca408f2-7d22-452c-9900-d5d364ce863c",
        "name": "Row 7",
        "cells": [
            build_text_span("Morbi feugiat dui diam, vulputate pulvinar risus cursus non."),
            build_text_span("Fusce et imperdiet metus."),
            build_text_span("Quisque sed sodales dui, a aliquet augue. Nullam congue ex ac mauris maximus, pharetra elementum est hendrerit."),
            build_text_span("Aenean sit amet blandit tellus."),
            build_text_span("Suspendisse nulla augue, pharetra ac arcu vel, bibendum malesuada odio."),
            build_text_span("Nunc eget viverra nulla. Integer est lacus, congue non mauris vel, sollicitudin tempor felis.")
        ]
    },
    {
        "uid": "2101eb4d-9575-4d25-bcfd-add379b738b6",
        "name": "Row 8",
        "cells": [
            build_text_span("Phasellus sodales neque id quam pretium, eget sodales risus vehicula."),
            build_text_span("Etiam et nibh augue."),
            build_text_span("Aenean a sem eget magna ullamcorper pulvinar sed non diam."),
            build_text_span("Cras tristique purus eget arcu scelerisque, vel posuere ex tempor."),
            build_text_span("Ut venenatis libero eget risus porta, ut bibendum turpis aliquet."),
            build_text_span("Donec justo ex, iaculis in sodales at, ultrices nec tortor.")
        ]
    }
];